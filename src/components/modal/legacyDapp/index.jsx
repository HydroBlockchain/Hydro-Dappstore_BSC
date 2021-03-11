/**
 * Displays a legacy dapp in a modal
 * NOTE: Legacy - Legacy dapps were created based on the previous front-end
 * The goal is now to move dapps from the front-end to their own website
 * Meanwhile, legacy dapps are still hosted here
 */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import SnowflakeContext from "../../../contexts/snowflakeContext";

import { Status } from "../../../legacy/BSC/0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB/index";
import { PetOwnerView } from "../../../legacy/BSC/0x26098F10E1539a6b75998AfB1DA552B8fD0AE404/index";
import { Oxide } from "../../../legacy/BSC/0x2930Cf9EE8E03C3E06Fa1828cCD8E371323Fde0f/index";
import { ElectionFactory } from "../../../legacy/BSC/0x8324EFD6A6762d713aBC48fC5473Cb0B5Af42D8a/index";
// { CharityFactory } from "../../../legacy/Rinkeby/0xcfB72ef46e9B6459e0992022437BbC248F62Eb99/index";
import { CharityFactory } from "../../../legacy/BSC/0x9de2D8a297f02188Cd63776C888767D0267F7006/index";


function LegacyDapp({ id, title, isOpen, toggle }) {
  const user = useContext(SnowflakeContext);
  const { ein } = user;

  function displayDapp() {
    if (id === "0x26098F10E1539a6b75998AfB1DA552B8fD0AE404") {
      return <PetOwnerView ein={ein} />;
    }

    if (id === "0x2930Cf9EE8E03C3E06Fa1828cCD8E371323Fde0f") {
      return <Oxide ein={ein} />;
    }

    if (id === "0x8324EFD6A6762d713aBC48fC5473Cb0B5Af42D8a") {
      return <ElectionFactory ein={ein} />;
    }

    
    if (id === "0x9de2D8a297f02188Cd63776C888767D0267F7006") {
      return <CharityFactory ein={ein} />;
    }

    return <Status ein={ein} />;
  }

  if (ein) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{displayDapp()}</ModalBody>
      </Modal>
    );
  }

  return null;
}

LegacyDapp.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LegacyDapp;
