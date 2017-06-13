import { composeRouter } from "../util/compose";
import { withDefaults } from "../util/resource";

const RESOURCE_NAME = "users";

export default composeRouter(RESOURCE_NAME)(
    withDefaults(RESOURCE_NAME)
);
