import { Col, Row, Input, Typography } from "antd";
import { useState } from "react";
import useSearch from "../../redux/issuesSlice/useSearch";
const { Search } = Input;

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [, handleSearch] = useSearch();
  const [validationError, setValidationError] = useState("");

  const regExp = /https:\/\/github.com\/.+\/.+/;

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValidationError("");
    setInputValue(e.target.value);
  };

  const handleInputClick = () => {
    if (!inputValue.match(regExp)) {
      setValidationError(
        "Please enter something like 'https://github.com/owner/repo' "
      );
      return;
    }
    handleSearch(inputValue);
    setInputValue("");
  };

  return (
    <Row>
      <Col span={24}>
        <Search
          placeholder="Enter repo URL"
          allowClear
          enterButton="Load Issues"
          size="large"
          value={inputValue}
          onChange={handleInput}
          onSearch={handleInputClick}
        />
      </Col>
      {validationError && (
        <Typography.Text type="danger">{validationError}</Typography.Text>
      )}
    </Row>
  );
};

export default SearchInput;
