import _ from 'lodash'
import PropTypes from "prop-types";
import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";
import { Table, Button } from 'semantic-ui-react'
import ListTableModal from './ListTableModal';


class UserLists extends Component {
	state = {
		column: null,
		direction: null
	}

	componentWillMount() {
		this.props.stuffActions.fetchLists(this.props.userId);
	}

	handleSort = (clickedColumn) => () => {
		const { column, direction } = this.state;
		const data = this.props.userLists;

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			})

			return
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}

	render() {
		const { column, direction } = this.state;
		const data = this.props.userLists;
		return (
			<Table sortable celled fixed>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							sorted={column === 'date' ? direction : null}
							onClick={this.handleSort('date')}
						>
							Date
            </Table.HeaderCell>
						<Table.HeaderCell
							sorted={column === 'description' ? direction : null}
							onClick={this.handleSort('description')}
						>
							Description
            </Table.HeaderCell>

						<Table.HeaderCell></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{_.map(data, ({ date, description, _id }, key) => (
						<Table.Row key={key}>
							<Table.Cell>{date}</Table.Cell>
							<Table.Cell>{description}</Table.Cell>
							<Table.Cell>
								<ListTableModal userId={this.props.userId} listId={_id} userLists={this.props.userLists}/>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		)
	}
}

UserLists.propTypes = {
	stuffActions: PropTypes.object,
	stuff: PropTypes.array,
	lookup: PropTypes.array,
	userLists: PropTypes.array
};

function mapStateToProps(state) {
	return {
		stuff: state.stuff,
		lookup: state.lookup,
		userLists: state.userLists
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
)(UserLists);