import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
	Table,
	Input,
	Button,
	Header,
	Icon,
	Modal,
	Loader,
	Dimmer
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';
import moment from "moment";
import Router from 'next/router';

class ListTableModal extends Component {
	state = {
		lookup: this.props.lookup,
		listName: '',
		userId: this.props.userId.id,
		modalOpen: false,
		listData: [],
		thisMoment: moment().format("LLLL"),
		loaderActive: false,
		apiServer: 'https://iuxta-api.herokuapp.com'
	};

	setName = evt => {
		this.setState({ listName: evt.target.value });
	}

	handleOpen = () => this.setState({ modalOpen: true })
	handleClose = () => {
		this.setState({ modalOpen: false });
	}

	saveList = () => {
		const newList = {
			userId: this.props.userId.id,
			description: this.state.listName,
			date: this.state.thisMoment,
			listArray: this.props.lookup
		};
		axios.post(`${this.state.apiServer}/api/post-list`, newList)
			.then(response => {
				return response;
			})
			.then(response => {
				if (response) {
					Router.push('/');
				}
			})
			.catch(error => {
				console.log(error);
			});
		this.handleClose();


	}

	renderLookupData = () => {
		return (
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>ASIN</Table.HeaderCell>
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
									<Table.Cell>{item.asin}</Table.Cell>
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

	renderSavedListData = (listId) => {
		return (
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>ASIN</Table.HeaderCell>
						<Table.HeaderCell>EAN</Table.HeaderCell>
						<Table.HeaderCell>Title</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Search Date</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				{this.props.userLists !== undefined && this.props.userLists.length > 0 ? (
					this.props.userLists.map((item, index) => {

						if (listId === item._id) {
							this.state.listName = item.description;
							this.state.listData = item.listArray;
							let listDataResult = this.state.listData.map((listItem, listItemIndex) => {
								return (
									<Table.Body key={listItemIndex}>
										<Table.Row >
											<Table.Cell>{listItemIndex + 1}</Table.Cell>
											<Table.Cell>{listItem.asin}</Table.Cell>
											<Table.Cell>{listItem.ean}</Table.Cell>
											<Table.Cell>{listItem.title}</Table.Cell>
											<Table.Cell>{listItem.price}</Table.Cell>
											<Table.Cell>{listItem.addTimestamp}</Table.Cell>
										</Table.Row>
									</Table.Body>
								);
							});
							return listDataResult;
						}
					})
				) : (
						<Table.Body>
							<Table.Row>
								<Table.Cell>No Data</Table.Cell>
							</Table.Row>
						</Table.Body>
					)}

			</Table>
		);
	};

	searchAmModal = () => {
		return (
			<Modal
				size="large"
				trigger={<Button onClick={this.handleOpen}>View Table</Button>}
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
		);
	}

	updateValues = async (e, data) => {
		this.setState({loaderActive: true});
		const asinArray = data.value.map(item => {
			return item.asin;
		});
		const lookupParams = JSON.stringify(asinArray).replace(/[\[\]"]+/g, "");
		await this.props.stuffActions.updateListStuff(lookupParams, this.props.userLists);
		axios.post(`${this.state.apiServer}/api/update-list?listId=${this.props.listId}&timeStamp=${this.state.thisMoment}`, this.props.lookup)
			.then(response => {
				return response;
			})
			.then(response => {
				if (response) {
					this.setState({loaderActive: false});
					window.location.href = '/';
				}
			})
			.catch(error => {
				console.log(error);
			});
		
	}

	savedListModal = (listId) => {
		return (
			<Modal
				size="large"
				trigger={<Button onClick={() => {
					this.handleOpen();
				}}>View Table</Button>}
				open={this.state.modalOpen}
				onClose={this.handleClose}
			>
				<Dimmer active={this.state.loaderActive}>
					<Loader />
				</Dimmer>
				<Modal.Header>{this.state.listName}</Modal.Header>
				<Modal.Content image scrolling>
					<Modal.Description>
						{this.renderSavedListData(listId)}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						value={this.state.listData}
						onClick={this.updateValues}
					>update</Button>
					<CSVLink
						data={this.state.listData}
						filename={`${this.state.listName.replace(' ', '-')}.csv`}
						className="ui primary button"
						target="_blank"
					>
						<Icon name="download" />
						Download CSV
              </CSVLink>
				</Modal.Actions>
			</Modal>
		);
	}

	render() {
		return this.props.path === '/search-am' ? this.searchAmModal() : this.savedListModal(this.props.listId);
	}
}

ListTableModal.propTypes = {
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
)(ListTableModal);