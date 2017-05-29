import PropTypes from 'prop-types';
import { compose, setPropTypes } from "recompose";

const SemanticFormField =
    ({ input, meta: { touched, error, warning }, as: As = Input, ...props }) => {
        return (
            <As {...input} value={input.value} {...props} onChange={input.onChange} 
                error={touched && error} />
        )
    }

export default
    setPropTypes(
        {
            as: PropTypes.any,
            input: PropTypes.any,
            label: PropTypes.any,
            meta: PropTypes.any
        }
    )(SemanticFormField);