/**
 * Displays the Wallet page
 */

import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import {
    useWeb3Context,
  } from 'web3-react';

  import {
    fromWei,
    toWei,
    toBN,
    formatAmount,
  } from '../../services/format';

import { useNamedContract} from '../../legacy/common/hooks';
import TransactionButton from '../../legacy/common/TransactionButton';
import HydroIcon from './hydro.png';
import './index.scss';



function Mint() {

  const context = useWeb3Context();
  const hydroToken = useNamedContract('token');
  
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">
            Mint Hydro Token From BSC
          </h1>
          
        </Col>
      </Row>
  
          
          <div style ={{textAlign:"center"}} className='centered mt-2'>
            <p className='mb-4'>
            <img src={HydroIcon} alt="Hydro" width={200} />
            </p>

            <p className='mb-4' style ={{color:"white"}}>
             Mint 30,000 Testnet Hydro token from binance smart chain to test the application
            </p> 

            <TransactionButton
              readyText='Mint Hydro Token'
              method={() => hydroToken.methods.mint(toWei('30000'))}
              block
            />
          </div>
  
     
    
    </Container>
  );
}

export default Mint;
