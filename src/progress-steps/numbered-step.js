/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledNumberStep,
  StyledNumberIcon,
  StyledContent,
  StyledContentTitle,
  StyledNumberContentTail,
  StyledContentDescription,
} from './styled-components.js';
import {
  StyledNumberStep as StyledNumberStepHorizontal,
  StyledNumberIcon as StyledNumberIconHorizontal,
  StyledContent as StyledContentHorizontal,
  StyledContentTitle as StyledContentTitleHorizontal,
  StyledNumberContentTail as StyledNumberContentTailHorizontal,
  StyledContentDescription as StyledContentDescriptionHorizontal,
} from './styled-components-horizontal.js';
import StyledCheckIcon from '../icon/check.js';

import type {NumberedStepPropsT} from './types.js';

function NumberedStep({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  isSecondLast,
  title,
  step,
  children,
}: NumberedStepPropsT) {
  const alignVertical = false;
  const [Root, rootProps] = getOverrides(
    overrides.Root,
    alignVertical ? StyledNumberStep : StyledNumberStepHorizontal,
  );
  const [Icon, iconProps] = getOverrides(
    overrides.Icon,
    alignVertical ? StyledNumberIcon : StyledNumberIconHorizontal,
  );
  const [Tail, tailProps] = getOverrides(
    overrides.Tail,
    alignVertical ? StyledNumberContentTail : StyledNumberContentTailHorizontal,
  );
  const [Content, contentProps] = getOverrides(
    overrides.Content,
    alignVertical ? StyledContent : StyledContentHorizontal,
  );
  const [Title, titleProps] = getOverrides(
    overrides.Title,
    alignVertical ? StyledContentTitle : StyledContentTitleHorizontal,
  );
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    alignVertical
      ? StyledContentDescription
      : StyledContentDescriptionHorizontal,
  );
  const [CheckIcon, checkIconProps] = getOverrides(
    overrides.Icon,
    StyledCheckIcon,
  );

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
    $isSecondLast: isSecondLast,
  };

  return (
    <Root {...sharedProps} {...rootProps}>
      <Icon {...sharedProps} {...iconProps}>
        {!isCompleted && <span>{step}</span>}
        {isCompleted && <CheckIcon size={12} {...checkIconProps} />}
      </Icon>
      {!isLast && <Tail {...sharedProps} {...tailProps} />}
      <Content {...sharedProps} {...contentProps}>
        <Title {...sharedProps} {...titleProps}>
          {title}
        </Title>
        <Description {...descriptionProps}>{isActive && children}</Description>
      </Content>
    </Root>
  );
}

NumberedStep.defaultProps = {
  isCompleted: false,
  isActive: false,
  isLast: false,
  isSecondLast: false,
};

export default NumberedStep;
