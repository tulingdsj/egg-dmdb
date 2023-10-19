'use strict';

// 将execute返回的result.rows进行格式化（加字段名）
function formatRows(rows, metaData) {
  const data = [];
  rows.forEach(item => {
    const row = {};
    metaData.forEach((meta, index) => {
      row[meta.name] = item[index];
    });
    data.push(row);
  });
  return data;
}

// 将execute返回的result.resultSet进行格式化（加字段名）
async function formatResultSet(resultSet, metaData) {
  const data = [];
  let item = await resultSet.getRow();
  while (item) {
    const row = {};
    for (let index = 0; index < metaData.length; index++) {
      row[metaData[index].name] = item[index];
    }
    data.push(row);
    item = await resultSet.getRow();
  }
  return data;
}

//对dmdb的execute方法返回的数据进行格式化
//单语句查询返回格式:[{colname1:value,colname2:value},{colname1:value,colname2:value}]
//多语句查询返回格式:[[{colname1:value,colname2:value},{colname1:value,colname2:value}],[{colname1:value,colname2:value},{colname1:value,colname2:value}]]
module.exports = async result => {
  if (result.rows) { // 单语句查询，返回非resultSet
    return formatRows(result.rows, result.metaData);
  } else if (result.resultSet) { // 单语句查询，返回resultSet
    return await formatResultSet(result.resultSet, result.metaData);
  } else if (result.implicitResults) { // 多语句查询
    const data = [];
    if (typeof result.implicitResults[0].getRow === 'function') { // 返回resultSet
      for (let i = 0; i < result.implicitResults.length; i++) {
        data.push(await formatResultSet(result.implicitResults[i], result.metaData[i]));
      }
    } else { // 返回非resultSet
      for (let i = 0; i < result.implicitResults.length; i++) {
        data.push(await formatRows(result.implicitResults[i], result.metaData[i]));
      }
    }
    return data;
  }
};
