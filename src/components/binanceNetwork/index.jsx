import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';

import {
  Modal,
  ModalBody,
 
} from 'reactstrap';


import Welcome from '../../common/img/steps/welcome.png';

function BinanceNetwork(props) {
    const {
        isOpen,
        toggle,
        hasProvider,
      } = props;

  return (
    <div>
    <Modal isOpen={isOpen} size="lg" toggle={toggle}>
    
       
      <ModalBody className="align-content-center onboarding__modal">
     
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={Welcome} width={300} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Hydro DappStore - BSC (Testnet)
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            This is the Binance Smart Chain version of Hydro dapp store. To access the application, please make sure you are connected to Binance Smart Chain-Testnet through metamask wallet.
            click the link below & follow the simple steps to configure metamask wallet with binance chain.
          </p>
        </Col>
      </Row>
     
      <Row className="justify-content-center">
        <Col xs="12" sm="10" className="text-center">
          <a className="text-white" href={'https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain'} target='blank'>
          Configuring Metamask with Binance Smart Chain
          </a>
        </Col>
      </Row>

      </ModalBody>
      
    </Modal>
  </div>
  );
}

BinanceNetwork.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    hasProvider: PropTypes.bool.isRequired,
  };

export default BinanceNetwork;