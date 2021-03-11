/* eslint-disable */

import React, { useState, useContext} from 'react';
import './style.css';
import Web3 from 'web3';
import { useGenericContract, useNamedContract,useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';
import VoteButton from './customButton/VoteButton';
import { useWeb3Context } from 'web3-react';
import snowflake from '../../../services/contracts/snowflake';
import hydro from '../../../services/contracts/hydro';

import candidatesImage from './Images/candidatesImage.png';
import Votingregistration from './Images/Votingregistration.png';
import { checkWhitelist } from "../../../services/utilities";




export default function Registration({ ein,electionABI, electionAddress,account,allowance}) {

  
  const context = useWeb3Context();

  const resolverContract = useGenericContract(electionAddress, electionABI);
  const snowFlake = useGenericContract(snowflake.address, snowflake.abi);
  const hydroContract= useGenericContract(hydro.address, hydro.abi);
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
  
  const [disable, disabled]  = useState(false);
  const [whitelist, whitelisted]  = useState('');

  useAccountEffect(() => {
    hydroContract.methods.whitelistedDapps(electionAddress).call().then(result =>{ result === true? disabled(false):disabled(true)});
    hydroContract.methods.whitelistedDapps(electionAddress).call().then(result =>{ result === true? whitelisted('Election Approved'):whitelisted('Admin approval needed')});
  })

  let isAllowed = false;
  if(allowance > 1500){
    isAllowed = true;
  }

  
  return (
    
    <div>
       <VoteButton
        readyText={whitelist} 
        method={() => hydroContract.methods._whiteListDapp(electionAddress)} 
        disabled={!disable}         
         />
      <div className="registrationWrapper"> <div className ="registerAsVoter" style ={{textAlign:"center"}}>
      <p>Disclaimer</p>
      <p>To participate in this election, you must first approve your HYDRO tokens. Once registered as a voter, you will be able to cast your vote that will burn 0.01 HYDRO tokens from your wallet.
      </p>
      <div className="registrationImage"><img src={Votingregistration} alt="snow" className="registrationImg"/></div> 
      
      {isAllowed ?<VoteButton
         readyText='Register As Participant' 
         method={() => snowFlake.methods.addResolver(electionAddress,true,web3.utils.toWei('10000000000'),'0x00')}           
         disabled={disable}/>:

          
      <VoteButton
        readyText='Approve' 
        method={() => hydroContract.methods.approve(electionAddress,web3.utils.toWei('10000000000'))}           
        disabled={disable}/>}
     
    </div>

    <div className ="registerAsVoter" style ={{textAlign:"center"}}> 
    <p>Disclaimer</p>
    <p>Registered participants could run as a candidate & must pay/burn 0.1 HYDRO tokens as candidate fee. if you think you are qualified to lead or take a position for an organization.
    </p>
    <div className="registrationImage"><img src={candidatesImage} alt="snow" className="registrationImg"/></div> 

    {isAllowed ?<VoteButton 
      readyText='Register As Candidate' 
      variant= "outlined" 
      color="primary" 
      className="registrationButton"   
      method={() => resolverContract.methods.becomeCandidate(ein)}
      disabled={disable}/>

      :    
      <VoteButton
        readyText='Approve' 
        method={() => hydroContract.methods.approve(electionAddress,web3.utils.toWei('10000000000'))}           
        disabled={disable} />}
 
</div>
</div>
                 
   
    </div>
  );
}