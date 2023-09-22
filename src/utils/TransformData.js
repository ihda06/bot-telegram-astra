const transformData = (rawdata) => {
  return rawdata.map((item) => {
    return {
      ...item.fields,
      id: item.id,
    };
  });
};

module.exports = transformData