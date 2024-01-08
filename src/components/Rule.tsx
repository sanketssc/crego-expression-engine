import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React from "react";

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

export default function Rule({
  rule,
  index,
  setData,
}: {
  rule: RuleData;
  index: number;
  setData: React.Dispatch<React.SetStateAction<DataSet>>;
}) {
  return (
    <Container className="mx-auto">
      <Row className="">
        <Col className="mx-auto my-auto col-1 d-none">{index + 1}</Col>
        <Col>
          <Form.Label htmlFor="ruleType">Rule</Form.Label>
          <Form.Select
            aria-label="Rule Type"
            id="ruleType"
            value={rule.key}
            onChange={(e) => {
              setData((prev) => {
                const newRules = prev.rules;
                const updatedRules = newRules.map((rule, i) => {
                  if (i === index) {
                    return { ...rule, key: e.target.value };
                  } else {
                    return rule;
                  }
                });
                return { ...prev, rules: updatedRules };
              });
            }}
          >
            <option value="age">Age </option>
            <option value="credit_score">Credit Score</option>
            <option value="account_balance">Account Balance</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="value">Value</Form.Label>
          <Form.Control
            value={Number(rule.output.value).toString()}
            onChange={(e) => {
              setData((prev) => {
                const newRules = prev.rules;
                const updatedRules = newRules.map((rule, i) => {
                  if (i === index) {
                    return {
                      ...rule,
                      output: {
                        ...rule.output,
                        value: +e.target.value * 1,
                      },
                    };
                  } else {
                    return rule;
                  }
                });
                return { ...prev, rules: updatedRules };
              });
            }}
            type="number"
            id="value"
            aria-describedby="value"
            placeholder="value"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="operator">Operator</Form.Label>
          <Form.Select
            aria-label="Operator Selector"
            id="operator"
            onChange={(e) => {
              setData((prev) => {
                const newRules = prev.rules;
                const updatedRules = newRules.map((rule, i) => {
                  if (i === index) {
                    return {
                      ...rule,
                      output: { ...rule.output, operator: e.target.value },
                    };
                  } else {
                    return rule;
                  }
                });
                return { ...prev, rules: updatedRules };
              });
            }}
            value={rule.output.operator}
          >
            <option value=">"> {">"} </option>
            <option value="<"> {"<"}</option>
            <option value=">=">{">="}</option>
            <option value="<=">{"<="}</option>
            <option value="=">{"="}</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="score">Score</Form.Label>
          <Form.Control
            value={Number(rule.output.score).toString()}
            onChange={(e) => {
              setData((prev) => {
                const newRules = prev.rules;
                const updatedRules = newRules.map((rule, i) => {
                  if (i === index) {
                    return {
                      ...rule,
                      output: {
                        ...rule.output,
                        score: +e.target.value,
                      },
                    };
                  } else {
                    return rule;
                  }
                });
                return { ...prev, rules: updatedRules };
              });
            }}
            type="number"
            id="score"
            aria-describedby="score"
            placeholder="score"
          />
        </Col>

        <Col className="mx-auto my-auto col-1">
          <Button
            className="mx-auto my-auto"
            variant="danger"
            onClick={() => {
              setData((prev) => {
                const newRules = prev.rules;
                newRules.splice(index, 1);
                return { ...prev, rules: newRules };
              });
            }}
          >
            X
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
