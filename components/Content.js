import React, { Component } from "react";
import {
	Container,
	Segment,
	Grid,
	List,
	Menu,
	Input,
	Button
} from "semantic-ui-react";
import Mainenu from "./Menu";
import StuffList from "./StuffList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";
import moment from "moment";
import ListTableModal from "./ListTableModal";

class Content extends Component {
	state = {
		lookup: this.props.lookup,
		thisMoment: moment().format("LLLL")
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

	render() {
		console.log('Content props ', this.props);
		return (
			<Container
				style={{ marginTop: "60px" }}
			>
				<Mainenu profileInfo={this.props.userId.name} />
				<Segment>
					<div style={{ width: '300px', margin: '40px auto' }}>
						{this.renderSearchField()}
					</div>
				</Segment>

				<Grid columns="equal">
					<Grid.Column>
						<Segment>
							<List ordered>{this.renderList()}</List>
							<ListTableModal userId={this.props.userId} path={this.props.path} />
						</Segment>
					</Grid.Column>
					<Grid.Column width={12}>
						<Segment>
							<StuffList addItemToList={this.addItemToList} />
						</Segment>
					</Grid.Column>
				</Grid>
			</Container>
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
