import React from 'react'

export default React.createClass({
  render() {
    return (
		<div>
			<h2>
				<span style={{color:'red'}}>{this.props.params.userName}</span> - 
				{this.props.params.repoName}
			</h2>
		</div>
    )
  }
})
