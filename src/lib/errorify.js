export default (props) => {
  if (props.error) {
    throw new Error(props.error);
  }

  return props;
};
