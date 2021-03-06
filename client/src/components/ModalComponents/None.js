import React, { useState } from 'react';
import { Button, Modal, Grid, Icon, Segment, Header } from 'semantic-ui-react';

const None = ({ x, y, contract, account, makeReload }) => {

  const build = async (buildType) => {
    if(!contract || !account) {
      alert("please wait a minute and try again");
      return;
    }
    let newBuildingId;
    const { createSawmill, createFarm, createMine, createQuarry, createManor } = contract.methods;
    switch (buildType) {
      case "Sawmill":
        newBuildingId = await createSawmill(x, y).send({from: account});
        break;
      case "Farm":
        newBuildingId = await createFarm(x, y).send({from: account});
        break;
      case "Mine":
        newBuildingId = await createMine(x, y).send({from: account});
        break;
      case "Quarry":
        newBuildingId = await createQuarry(x, y).send({from: account});
        break;
      case "Manor":
        newBuildingId = await createManor(x, y).send({from: account});
        break;
        default:
          console.alert("invalid buildingType");
          break;
    }
    console.log(newBuildingId);
    makeReload();
    const buildingLen = await contract.methods.getBuildingsLen().call({from: account});
    console.log(buildingLen);
  }

  return <>
    <Modal.Content image>
      <Grid columns='equal' divided inverted padded>
        <Grid.Row>
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                Sawmill
                <Icon name='tree' style={{ color: 'green' }} />
              </Header>
              <Button primary onClick={() => build("Sawmill")}>Build</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                Farm
                <Icon name='food' style={{ color: 'gainsboro' }} />
              </Header>
              <Button primary onClick={() => build("Farm")}>Build</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                Mine
                <Icon name='lock' style={{ color: 'black' }} />
              </Header>
              <Button primary onClick={() => build("Mine")}>Build</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                Quarry
                <Icon name='hand rock' style={{ color: 'gray' }} />
              </Header>
              <Button primary onClick={() => build("Quarry")}>Build</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                Manor
                <Icon name='bitcoin' style={{ color: 'gold' }} />
              </Header>
              <Button primary onClick={() => build("Manor")}>Build</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  </>
}

export default None;