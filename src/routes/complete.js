import React, { Component } from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Chartist from "chartist"

const options = {
  axisX: {
    showGrid: false
  },
  axisY: {
    offset: 0,
    showGrid: false,
    showLabel: false
  }
}

const options2 = {
  height: "200px",
  axisX: {
    showLabel: false,
    showGrid: false,
    offset: 10
  },
  axisY: {
    offset: 80,
    showGrid: false
  },
  horizontalBars: true
}

class Complete extends Component {
  componentDidMount() {
    if (!this.props.loading) {
      this.renderChart()
    }
  }

  renderChart() {
    const { weekDay, categorys } = this.props
    const firstData = {
      labels: Object.keys(weekDay),
      series: [Object.values(weekDay)]
    }

    const secondData = {
      labels: Object.keys(categorys),
      series: [Object.values(categorys)]
    }

    new Chartist.Bar(this.firstChart, firstData, options)
    new Chartist.Bar(this.secondChart, secondData, options2)
  }

  render() {
    const { loading, active, completed, created } = this.props

    if (loading) {
      return <Redirect to="/" />
    }

    return (
      <React.Fragment>
        <Container>
          <div>
            {active}
            <br />Active
          </div>
          <div>
            {completed}
            <br />Completed
          </div>
          <div>
            {created}
            <br />Created
          </div>
        </Container>
        <Graph innerRef={e => (this.firstChart = e)}>
          <Title>Completed by day</Title>
        </Graph>
        <Graph innerRef={e => (this.secondChart = e)}>
          <Title>Completed by category</Title>
        </Graph>
      </React.Fragment>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  padding: 1rem;
  font-size: 1.8rem;
  color: #212121;
  text-align: center;
`

const Title = styled.h1`
  margin: 1rem 1rem 0;
  font-size: 1.8rem;
  color: #212121;
`

const Graph = styled.div`
  margin-bottom: 2rem;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.9);

  & svg .ct-label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #212121;
    text-align: center;
  }

  & svg .ct-label.ct-vertical {
    justify-content: flex-end;
    align-items: center;
  }

  & svg .ct-bar {
    fill: none;
    stroke: #8cc800;
    stroke-width: 0.8rem;
    stroke-linecap: round;
  }
`

const state = ({
  stats: { active, created, completed, categorys, weekDay },
  todos: { loading }
}) => {
  return {
    loading,
    active,
    created,
    completed,
    categorys,
    weekDay
  }
}

export default connect(state)(Complete)
