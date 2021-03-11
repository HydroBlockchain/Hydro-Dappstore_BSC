/**
 * Displays the dapps added by the current user
 */

import React, { useContext } from "react";
import { Row, Col, CardDeck } from "reactstrap";

import SnowflakeContext from "../../contexts/snowflakeContext";

import DappPreview from "../../components/dappPreview";
import AdditionalHelp from "../../components/additionalHelp";

function Manage() {
  const user = useContext(SnowflakeContext);

  const { dapps, ein } = user;

  let myDapps = dapps.filter((dapp)=>dapp === '0x8324EFD6A6762d713aBC48fC5473Cb0B5Af42D8a' 
                                  || dapp === '0x971F70a231a16eb3e0D4602176c51AFcD86285FF')
  return (
    <div>
      <Row className="pb-3">
        <Col>
          <h1 className="title">Your dApps: {myDapps.length}</h1>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          {myDapps.length > 0 ? (
            <CardDeck>
              {myDapps.map((dapp) => (
                <DappPreview
                  key={dapp}
                  id={dapp}
                  legacy
                  isAdded
                  hasIdentity={ein !== null}
                />
              ))}
            </CardDeck>
          ) : (
            <AdditionalHelp />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Manage;
