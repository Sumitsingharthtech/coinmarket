const ellipsis = (value, length) => `${value.slice(0, length)}...${value.slice(value.length - length)}`;

export default ellipsis;
