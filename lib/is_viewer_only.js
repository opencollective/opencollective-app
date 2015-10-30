import every from 'lodash/collection/every';

export default (groups) => every(groups, 'role', 'viewer');
