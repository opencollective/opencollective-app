import any from 'lodash/collection/any';

export default (groups) => any(groups, 'role', 'host');
