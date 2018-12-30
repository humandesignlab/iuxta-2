import React, { Component } from "react";
import Router from "next/router";
import {
	Responsive,
	Container,
	Segment,
	Grid,
	List,
	Menu,
	Input,
	Button,
	Header,
	Icon,
	Modal,
	Table
} from "semantic-ui-react";
import Mainenu from "./Menu";
import StuffList from "./StuffList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';

class Content extends Component {
	state = {
		lookup: this.props.lookup,
		thisMoment: moment().format("LLLL"),
		listName: '',
		userId: this.props.userId.id,
		modalOpen: false
	};
	updateInputValue = evt => {
		this.setState({
			inputValue: evt.target.value
		});
	};

	handleSearchSubmit = () => {
		this.props.stuffActions.fetchStuff(
			this.state.inputValue,
			this.props.lookup
		);
	};

	handleSimilarityLookupSubmit = () => {
		this.props.stuffActions.fetchSimilarityLookupStuff(
			this.state.inputValue,
			this.props.lookup
		);
	};

	updateLookupProps = async () => {
		const updatedLookupProps = await this.props.stuffActions.updateLookupProps(
			this.props.lookup,
			this.props.stuff
		);
		this.setState({
			lookup: updatedLookupProps
		});
	};

	removeItemFromList = index => {
		this.props.lookup.splice(index, 1);
		this.updateLookupProps();
		console.log(this.props);
	};

	addItemToList = (e, data) => {
		this.props.lookup.push(data.value);
		this.updateLookupProps();
	};

	handleChange = async (e, data) => {
		if (this.props.lookup.includes(data.value)) {
			for (var i = this.props.lookup.length - 1; i >= 0; i--) {
				if (this.props.lookup[i] === data.value) {
					this.props.lookup.splice(i, 1);
				}
			}
			this.updateLookupProps();
		} else {
			this.props.lookup.push(data.value);
			this.updateLookupProps();
		}
	};

	handleLookupSubmit = async () => {
		let asinArray = [];

		this.props.lookup.map(item => {
			asinArray.push(item.asin);
		});

		const lookupParams = JSON.stringify(asinArray).replace(/[\[\]"]+/g, "");
		console.log("lookupParams ", lookupParams);
		await this.props.stuffActions.lookupStuff(lookupParams);

		this.props.stuff[0].map(item => {
			console.log("lookup result ", item.ItemAttributes);
		});
	};

	saveList = () => {
		const newList = {
			userId: this.props.userId.id,
			description: this.state.listName,
			date: this.state.thisMoment,
			listArray: this.props.lookup
		};
		axios.post('http://localhost:3030/api/post-list', newList)
			.then(function (response) {
				console.log('response ', response);
			})
			.catch(function (error) {
				console.log(error);
			});
		console.log('data ', newList);
		this.handleClose();
	}

	setName = evt => {
		this.setState({ listName: evt.target.value });
	}

	handleOpen = () => this.setState({ modalOpen: true })
	handleClose = () => {
		this.setState({ modalOpen: false });
		Router.push('/');
	}

	renderMenu = () => {
		return (
			<Menu stackable className="fixed">
				<Menu.Item className="item">Iuxta</Menu.Item>

				<Menu.Menu position="right">
					{/*<Menu.Item>
            <Input
              type="text"
              placeholder="ASIN Similarity Lookup Search..."
              action
              onChange={this.updateInputValue}
            >
              <input />
              <Button type="submit" onClick={this.handleSimilarityLookupSubmit}>
                Search
              </Button>
            </Input>
          </Menu.Item>*/}
					<Menu.Item>

					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	};

	renderSearchField = () => {
		return (
			<Input
				type="text"
				placeholder="Text Search..."
				action
				onChange={this.updateInputValue}
			>
				<input />
				<Button type="submit" onClick={this.handleSearchSubmit}>
					Search
              </Button>
			</Input>
		)
	}

	renderList = () => {
		return this.props.lookup !== undefined && this.props.lookup.length > 0
			? this.props.lookup.map((item, index) => {
				return (
					<List.Item key={index}>
						<List.Content>
							<List.Header>{item.ean}</List.Header>
							<List.Description>{item.title}</List.Description>
						</List.Content>
						<Button
							size="mini"
							content="Remove"
							onClick={this.removeItemFromList.bind(index)}
						/>
					</List.Item>
				);
			})
			: "Empty List";
	};

	renderLookupData = () => {
		return (
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>EAN</Table.HeaderCell>
						<Table.HeaderCell>Title</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Search Date</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.props.lookup !== undefined && this.props.lookup.length > 0 ? (
						this.props.lookup.map((item, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>{item.ean}</Table.Cell>
									<Table.Cell>{item.title}</Table.Cell>
									<Table.Cell>{item.price}</Table.Cell>
									<Table.Cell>{item.addTimestamp}</Table.Cell>
								</Table.Row>
							);
						})
					) : (
							<Table.Row>
								<Table.Cell>No Data</Table.Cell>
							</Table.Row>
						)}
				</Table.Body>
			</Table>
		);
	};

	renderSaveButton = () => {
		return (
			<Modal
				size="large"
				trigger={<Button onClick={this.handleOpen}>Save List or Export Data</Button>}
				open={this.state.modalOpen}
				onClose={this.handleClose}
			>
				<Modal.Header>Export Data</Modal.Header>
				<Modal.Content image scrolling>
					<Modal.Description>
						<Header>Selected Items to Export</Header>
						{this.renderLookupData()}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Input placeholder='List description' onChange={this.setName} />
					<Button onClick={this.saveList}>Save List</Button>
					<CSVLink
						data={this.props.lookup}
						filename={"my-file.csv"}
						className="ui primary button"
						target="_blank"
					>
						<Icon name="download" />
						Download CSV
              </CSVLink>
				</Modal.Actions>
			</Modal>
		)
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<Responsive
					as={Container}
					minWidth={320}
					maxWidth={991}
					style={{ marginTop: "140px" }}
				>
					<Mainenu />
					{this.renderMenu()}
					<Segment>
						<List>{this.renderList()}</List>
					</Segment>
					<Segment>
						<StuffList addItemToList={this.addItemToList} />
					</Segment>
				</Responsive>
				<Responsive
					as={Container}
					{...Responsive.onlyComputer}
					style={{ marginTop: "60px" }}
				>
				<Mainenu profileInfo={this.props.userId.name}/>
						<Segment>
							<div style={{width:'300px', margin: '40px auto'}}>
								{this.renderSearchField()}
							</div>							
						</Segment>

					<Grid columns="equal">
						<Grid.Column>
							<Segment>
								<List ordered>{this.renderList()}</List>
								{this.renderSaveButton()}
							</Segment>
						</Grid.Column>
						<Grid.Column width={12}>
							<Segment>
								<StuffList addItemToList={this.addItemToList} />
							</Segment>
						</Grid.Column>
					</Grid>
				</Responsive>
			</div>
		);
	}
}

Content.propTypes = {
	stuffActions: PropTypes.object,
	stuff: PropTypes.array,
	lookup: PropTypes.array,
	session: PropTypes.object
};

function mapStateToProps(state) {
	return {
		stuff: state.stuff,
		lookup: state.lookup
	};
}

function mapDispatchToProps(dispatch) {
	return {
		stuffActions: bindActionCreators(stuffActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);
