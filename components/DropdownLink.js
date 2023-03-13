import Link from 'next/link';
import React from 'react'

const DropdownLink = React.forwardRef((props, ref) => {
    let { href, children, ...rest } = props;
    return (
        <Link ref={ref} href={href} {...rest}>
            {children}
        </Link>
    )
});

DropdownLink.displayName = 'ReactLink';

export default DropdownLink;