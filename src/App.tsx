import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useState } from "react";

import Rule from "./components/Rule";

interface RuleData {
  key: string;
  output: {
    value: number;
    operator: string;
    score: number;
  };
}

interface DataSet {
  combinator: string;
  rules: RuleData[];
}

function App() {
  const [data, setData] = useState<DataSet>({
    combinator: "and",
    rules: [
      {
        key: "age",
        output: {
          value: 50,
          operator: "=",
          score: 50,
        },
      },
      {
        key: "credit_score",
        output: {
          value: 100,
          operator: "<",
          score: 123,
        },
      },
    ],
  });

  return (
    <Container className="mx-auto">
      <h1 className="text-center ">Crego Expression Engine</h1>
      <Dropdown className="my-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {data.combinator}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setData({ ...data, combinator: "and" });
            }}
          >
            and
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setData({ ...data, combinator: "or" });
            }}
          >
            or
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {data.rules.map((rule, index) => {
        return (
          <Rule
            key={index.toString()}
            rule={rule}
            index={index}
            setData={setData}
          />
        );
      })}
      <Row>
        <Col>
          <Button
            className="my-3 w-100"
            variant="primary"
            onClick={() =>
              setData({
                ...data,
                rules: [
                  ...data.rules,
                  { key: "age", output: { value: 0, operator: "=", score: 0 } },
                ],
              })
            }
          >
            Add Rule
          </Button>
        </Col>
        <Col className="">
          <Button
            className="w-100 my-3"
            variant="primary"
            onClick={() => {
              console.log(data);
            }}
          >
            ShowData
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
