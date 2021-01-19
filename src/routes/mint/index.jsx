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
    toWei,
  } from '../../services/format';

//import TransactionButton from '../../legacy/common/TransactionButton';
import TransactionButton from "../../components/transactionButton";
import HydroIcon from './hydro.png';
import './index.scss';
import { getHydroTestTokens } from "../../services/utilities";



function Mint() {

  const web3 = useWeb3Context();

  
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">
            Mint Hydro Token From BSC
          </h1>
          
        </Col>
      </Row>
  
          
          <div className='centered mt-2'>
          <a className='token-address' 
          href='https://testnet.bscscan.com/address/0x83FAaC162062524e041dFB43681B0d958eD49Acb'
          target='blank'>
            Hydro(BEP-20): 0x83FAaC162062524e041dFB43681B0d958eD49Acb
            </a>
          <br/>
          <a className='token-address' 
          href='https://testnet.binance.org/faucet-smart'
          target='blank'>
            BNB Testnet Faucet
            </a>

            <p className='mb-4 mt-5'style = {{textAlign:"center"}} >
            <img src={HydroIcon} alt="Hydro" width={200} />
            </p>

            <p className='mb-4' style ={{color:"white"}} style = {{textAlign:"center"}} >
             Mint 30,000 testnet Hydro token from binance smart chain to test the application
            </p> 
            <div style = {{textAlign:"center"}}>
           

            <TransactionButton
            initialText="Mint Hydro Tokens"
            sendAction={() => getHydroTestTokens(web3.library, web3.account)}
            displayModal
            />

            </div>
          </div>
  
     
    
    </Container>
  );
}

export default Mint;
