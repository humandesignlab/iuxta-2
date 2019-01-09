import React from "react";
import {
  Table,
  Button
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";
import moment from "moment";

class StuffList extends React.Component {
  state = {
    inputValue: "",
    thisMoment: moment().format("LLLL")
  };

  renderData() {
    return (
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Add to List </Table.HeaderCell>
            {/*<Table.HeaderCell>ASIN</Table.HeaderCell>*/}
            <Table.HeaderCell>EAN</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Lowest New Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.stuff !== undefined && this.props.stuff.length > 1 ? (
            this.props.stuff.map((item, index) => {
              const newValue =
                item.OfferSummary.LowestNewPrice !== undefined
                  ? (
                      parseInt(item.OfferSummary.LowestNewPrice.Amount) / 100
                    ).toFixed(2)
                  : "No Price available";
              return (
                <Table.Row key={index}>
                  <Table.Cell collapsing>
                    <Button
                      size="mini"
                      content="Add"
                      value={{
                        asin: item.ASIN,
                        ean: item.ItemAttributes.EAN,
                        title: item.ItemAttributes.Title,
                        price: newValue,
                        addTimestamp: this.state.thisMoment
                      }}
                      onClick={this.props.addItemToList}
                    />
                  </Table.Cell>
                  {/*<Table.Cell>{item.ASIN}</Table.Cell>*/}
                  <Table.Cell>{item.ItemAttributes.EAN}</Table.Cell>
                  <Table.Cell>{item.ItemAttributes.Brand}</Table.Cell>
                  <Table.Cell>{item.ItemAttributes.Title}</Table.Cell>
                  <Table.Cell>{newValue}</Table.Cell>
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
  }

  render() {
    return <div>{this.renderData()}</div>;
  }
}

StuffList.propTypes = {
  stuffActions: PropTypes.object,
  stuff: PropTypes.array,
  lookup: PropTypes.array
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
)(StuffList);
