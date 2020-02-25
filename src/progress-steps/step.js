/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledStep,
  StyledIcon,
  StyledInnerIcon,
  StyledContent,
  StyledContentTitle,
  StyledContentTail,
  StyledContentDescription,
} from './styled-components.js';
import {
  StyledStep as StyledStepHorizontal,
  StyledIcon as StyledIconHorizontal,
  StyledInnerIcon as StyledInnerIconHorizontal,
  StyledContent as StyledContentHorizontal,
  StyledContentTitle as StyledContentTitleHorizontal,
  StyledContentTail as StyledContentTailHorizontal,
  StyledContentDescription as StyledContentDescriptionHorizontal,
} from './styled-components-horizontal.js';

import type {StepPropsT} from './types.js';

function Step({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  isSecondLast,
  title,
  children,
}: StepPropsT) {
  const alignVertical = false;
  const [Root, rootProps] = getOverrides(
    overrides.Root,
    alignVertical ? StyledStep : StyledStepHorizontal,
  );
  const [Icon, iconProps] = getOverrides(
    overrides.Icon,
    alignVertical ? StyledIcon : StyledIconHorizontal,
  );
  const [InnerIcon, innerIconProps] = getOverrides(
    overrides.InnerIcon,
    alignVertical ? StyledInnerIcon : StyledInnerIconHorizontal,
  );
  const [Tail, tailProps] = getOverrides(
    overrides.Tail,
    alignVertical ? StyledContentTail : StyledContentTailHorizontal,
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

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
    $isSecondLast: isSecondLast,
  };

  return (
    <Root {...sharedProps} {...rootProps}>
      <Icon {...sharedProps} {...iconProps}>
        {isActive && <InnerIcon {...innerIconProps} />}
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

Step.defaultProps = {
  isCompleted: false,
  isActive: false,
  isLast: false,
  isSecondLast: false,
};

export default Step;
