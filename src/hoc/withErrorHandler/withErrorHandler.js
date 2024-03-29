import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state={
            error:null
        }
        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.resInnterceptor=axios.interceptors.response.use(null,error=>{
                this.setState({error:error});
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInnterceptor);
        }
        errorConfirmedHandler=()=>
        {
            this.setState({error:null});
        }
        render(props) {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error?this.state.error.message:null }</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
export default withErrorHandler;