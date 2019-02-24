import { IncomingMessage } from "http";

/**
 * @param request IncomingMessage The incoming request.
 * @param ...params any[] The parameters to pass to the middleware exec.
 * @returns boolean Whether to process the result and its enforcement.
 */
export type ResourceACLMiddlewareExec = (request: Partial<IncomingMessage>, ...params: any[]) => boolean;

/**
 * A type used to validate input values. Is either a regular expression or a
 * function accepting a single argument.
 */
export type ResourceACLMiddlewareFormInputValidator = RegExp|((value: any) => boolean);

/**
 * Accepts formValues and formObjects, and returns a value to be stored in the
 * params property of an ACL entry.
 *
 * @param formValues Array<string|number|boolean> The values from the form.
 * @param formObject IResourceACLMiddlewareFormInput[] The form object used to
 *      create the formValues.
 * @returns The value to store
 */
export type ResourceACLMiddlewareParamHandler = (
    formValues: Array<string|number|boolean>,
    formObject?: IResourceACLMiddlewareFormInput[],
) => string|number|boolean;

/**
 * For form input types of "select", a description of the value and display of a
 * select option.
 */
export interface IResourceACLMiddlewareFormInputOption {
    /**
     * The text to display for the option.
     */
    label: string;
    /**
     * The value to use for the option.
     */
    value: string|number|boolean;
}

/**
 * Describe an input for a middleware form.
 */
export interface IResourceACLMiddlewareFormInput {
    /**
     * The label text to display.
     */
    label: string;
    /**
     * A description of the form input.
     */
    description: string|string[];
    /**
     * The type of form control the input should render as.
     */
    type: string;
    /**
     * The option set for "select" inputs.
     */
    options?: IResourceACLMiddlewareFormInputOption[];
    /**
     * If a "non-select" input type, then a method to validate the input.
     */
    validate?: ResourceACLMiddlewareFormInputValidator;
    /**
     * A collection of example values.
     */
    examples: string[];
}

/**
 * An object describing middleware and its validation and ACL creation.
 */
export interface IResourceACLMiddleware {
    /**
     * The internal name of the middleware.
     */
    name: string;
    /**
     * The display text of the middleware.
     */
    display: string;
    /**
     * A description of the middleware and its function.
     */
    description: string|string[];
    /**
     * The function to use to determine if the middleware result should be
     * applied.
     */
    exec: ResourceACLMiddlewareExec;
    /**
     * The form object to use to create a form for an ACL using this middleware.
     */
    form: IResourceACLMiddlewareFormInput[];
    /**
     * The functions that create the stored parameters for ACL creation.
     */
    handleParams: ResourceACLMiddlewareParamHandler[];
}

/**
 * A description of ACL entry storage structure.
 */
export interface IResourceACLEntry {
    /**
     * The name of the middleware used to determine whether this entry is applied.
     */
    middleware?: string;
    /**
     * The parameters to pass to the middleware.
     */
    params?: Array<string|number|boolean>;
    /**
     * The result to set if the middleware execution is true.
     */
    result: boolean;
    /**
     * Whether to enforce the result, if applied, across subsequent processing.
     */
    enforce: boolean;
}

/**
 * The currently applied permission result and whether it is to be enforce.
 */
export interface IPermissionObject {
    /**
     * Whether to protect the result from future processing, unless future
     * processing is enforced as well.
     */
    enforce: boolean;
    /**
     * The result of the permission.
     */
    result: boolean;
}

/**
 * The structure of the permissions object, including all permissions available
 * on a resource.
 */
export interface IPermissionsObject {
    /**
     * Whether an identity can create new items in child folders.
     */
    create?: IPermissionObject;
    /**
     * Whether an identity can view a resource.
     */
    read?: IPermissionObject;
    /**
     * Whether an identity can update a resource.
     */
    update?: IPermissionObject;
    /**
     * Whether an identity can delete a resource.
     */
    delete?: IPermissionObject;
    /**
     * Whether an identity can add create permissions to a resource.
     */
    permCreate?: IPermissionObject;
    /**
     * Whether an identity can add view permissions to a resource.
     */
    permRead?: IPermissionObject;
    /**
     * Whether an identity can add update permissions to a resource.
     */
    permUpdate?: IPermissionObject;
    /**
     * Whether an identity can add delete permissions to a resource.
     */
    permDelete?: IPermissionObject;
}
