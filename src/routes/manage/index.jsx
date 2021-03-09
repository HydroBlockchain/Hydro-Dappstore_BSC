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

  let myDapps = dapps.filter((dapp)=>dapp === '0x9de2D8a297f02188Cd63776C888767D0267F7006' 
                                  || dapp === '0x4B09dBb0B7f402A721dFAD7f9Db41831bDE4004a')
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
