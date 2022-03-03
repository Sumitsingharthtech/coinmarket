import React, {
  forwardRef
} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Page = forwardRef(({
  title,
  ogTitle,
  description,
  children,
  ...rest
}, ref) => (
  <div
    ref={ref}
    {...rest}
  >
    <Helmet>
      <title>
        {title}
        {' '}
        | Incscan.io
      </title>
      <meta property="og:title" content={ogTitle} />
      <meta
        property="og:description"
        content={description}
      />
      <meta name="twitter:title" content={ogTitle} />
      <meta
        property="twitter:description"
        content={description}
      />
    </Helmet>
    {children}
  </div>
));

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  ogTitle: PropTypes.string,
  description: PropTypes.string
};

export default Page;
