// components/Navigation.jsx
'use client'

import Link from 'next/link';

const Navigation = ({ pages }) => {
    return (
        <nav>
            <ul>
                {pages.map((page) => (
                    <li key={page.path}>
                        <Link href={page.path}>{page.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
