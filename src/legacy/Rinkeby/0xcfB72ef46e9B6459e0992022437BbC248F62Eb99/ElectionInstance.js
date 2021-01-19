/* eslint-disable */


import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';
import Registration from './Registration';
import VerificationPage from './VerificationPage';
import ChartPage from './ChartPage';
import ProfilePage from './ProfilePage';
import ElectionInstanceABI from './ABI/ElectionInstanceABI'
import hydro from '../../../services/contracts/hydro';

export default class ElectionFactory extends Component {


	constructor(props) {
		super(props)
			this.state = {
            electionABI:[],
            hydroContrace:[],
            allowance:0,
            accounts:[],
            blockNumber:'',       
        }
       
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
	}


    async loadBlockchain(){
     
        let ethereum= window.ethereum;
        let web3=window.web3;
    
         if(typeof ethereum !=='undefined'){
         await ethereum.enable();
         web3 = new Web3(ethereum);       
        }
     
         else if (typeof web3 !== 'undefined'){
         console.log('Web3 Detected!')
         window.web3 = new Web3(web3.currentProvider);
         }
         
         else{console.log('No Web3 Detected')
        window.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
         }
            const network = await web3.eth.net.getNetworkType();

            const accounts = await web3.eth.getAccounts();
       
             if (this._isMounted){
            this.setState({account: accounts[0]}); 
             }

            const electionContract = new web3.eth.Contract(ElectionInstanceABI,this.props.Address);
            if (this._isMounted){
                this.setState({electionContract:electionContract},()=>console.log());
            }

            const title = await electionContract.methods.snowflakeName().call()
            if (this._isMounted){
                this.setState({title:title});
            }

            const hydroContract = new web3.eth.Contract(hydro.abi,hydro.address);
            if (this._isMounted){
                this.setState({hydroContract:hydroContract},()=>console.log());
            }

            const allowance = await this.state.hydroContract.methods.allowance(this.state.account,this.props.Address).call()
            if (this._isMounted){
                this.setState({allowance:web3.utils.fromWei(allowance)},()=>console.log());
            }

            this.state.hydroContract.events.allEvents({filter:{_owner:this.state.account,_from:this.state.account,_to:this.state.account}, toBlock:'latest'})
            .on('data',(log)=>{ this.loadBlockchain()})
        }
        
 

  render() {    
   
        /*Sub Page of Election Page */
        let subBody = <div className="spinner"/>
        if(this.state.title !== null){
           
        if(this.props.subPage === 1 && this.state.title !== null){
            subBody = <Registration electionABI={ElectionInstanceABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account} allowance={this.state.allowance}/>
        }
        else if(this.props.subPage === 2 && this.state.title !== null){
            subBody = <VerificationPage electionABI={ElectionInstanceABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 3 && this.state.title !== null){
            subBody = <ChartPage electionABI={ElectionInstanceABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 4 && this.state.title !== null){
            subBody = <ProfilePage electionABI={ElectionInstanceABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account} goToVoting={this.props.goToVoting} goToRegistration = {this.props.goToRegistration}/>
        }
    }

    return (
        
        <div>

            <div>
               {subBody}            
            </div>
            </div>
		);
	}
}
