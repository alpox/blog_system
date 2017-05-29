import { Modal, Button, Header, Image, Form, Icon } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form';
import { compose, setPropTypes } from 'recompose';
import SemanticFormField from '../utils/SemanticFormField'

const enhance = compose(
    reduxForm({ form: 'login' })
)

const LoginForm = enhance(({login}) => 
    <Form onSubmit={login}>
        <Field component={SemanticFormField} as={Form.Field} control="input" 
                label="Username" name="username" type="text" />
        <Field component={SemanticFormField} as={Form.Field} control="input" 
                label="Password" name="password" type="password" />
        <Button type="submit" primary><Icon name="unlock" />Login</Button>
    </Form>
)

const LoginModal = () =>
    <Modal trigger={<Button>Login</Button>} size="small">
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
            <LoginForm />
        </Modal.Content>
    </Modal>

export default LoginModal;