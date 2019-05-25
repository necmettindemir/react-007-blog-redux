import React from 'react';
import { connect  } from 'react-redux';
//import { fetchUser } from '../actions';

class UserHeader extends React.Component {

    componentDidMount() {
        //console.log(this.props);
        //this.props.fetchUser(this.props.userId);
    }

    render() {

       // const user = this.props.users.find( (user) => user.id === this.props.userId);
                        
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return (            
            <div className="header">
                {user.name}
            </div>
        );
    }
}

/*  const mapStatetoProps =( state) => {
    return { users : state.users};
}  */

const mapStatetoProps =( state, ownProps) => {
    return {         
user : state.users.find(u => u.id === ownProps.userId)    
            };
} 

//export default connect(mapStatetoProps , {fetchUser} )(UserHeader);
export default connect(mapStatetoProps)(UserHeader);