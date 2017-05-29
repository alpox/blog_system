import { Modal, Button, Header, Image, Form, Icon } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form';
import { compose, setPropTypes } from 'recompose';
import { connect } from 'react-redux';
import SemanticFormField from '../utils/SemanticFormField'
import actions from './actions';

const enhance = compose(
    connect(state => state.authentication),
    reduxForm({ 
        form: 'login',
        onSubmit: (values, dispatch) =>
            dispatch(actions.auth.registration.request(values))
    })
)

const RegistrationForm = enhance(({handleSubmit}) => 
    <Form onSubmit={handleSubmit}>
        <Field component={SemanticFormField} as={Form.Field} control="input" 
                label="Username" name="username" type="text" />
        <Field component={SemanticFormField} as={Form.Field} control="input" 
                label="Email" name="email" type="text" />
        <Field component={SemanticFormField} as={Form.Field} control="input" 
                label="Password" name="password" type="password" />
        <Button type="submit" primary><Icon name="unlock" />Register</Button>
    </Form>
)

const RegistrationModal = () =>
    <Modal trigger={<Button>Registration</Button>} size="small">
        <Modal.Header>Registration</Modal.Header>
        <Modal.Content>
            <RegistrationForm />
        </Modal.Content>
    </Modal>

export default RegistrationModal;