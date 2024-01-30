'use client';

import React, { ComponentPropsWithoutRef } from "react";

type Props = {}

const Button: React.FC<ComponentPropsWithoutRef<'button'>> = (props) => {
    return <button {...props} />
};

export default Button;