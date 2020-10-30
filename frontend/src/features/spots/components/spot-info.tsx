import React from 'react'
import { useStore } from 'effector-react'
import { isNil } from 'ramda'
import styled from 'styled-components'

import { Spinner, Typography } from 'components'

import { $spot, $selectedSpot, spotInfoClosed } from '../model'

export const SpotInfo = () => {
  const { data, isLoading } = useStore($spot)
  const selectedSpot = useStore($selectedSpot)

  if (isNil(selectedSpot)) {
    return null
  }

  const spotInfoBlock = (
    <>
      <Typography.Paragraph>Name: {data?.name}</Typography.Paragraph>
      <Typography.Paragraph>
        Geo: {data?.latitude}, {data?.longitude}
      </Typography.Paragraph>
    </>
  )

  // TODO: TS-ignore
  return (
    <Container>
      <Typography.H3 style={{ marginBottom: '16px' }}>Spot {selectedSpot}</Typography.H3>
      {/* @ts-ignore */}
      <CloseButton onClick={spotInfoClosed}>x</CloseButton>
      {isLoading ? <Spinner /> : spotInfoBlock}
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  background: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const CloseButton = styled.button`
  font-family: system-ui;
  font-size: 20px;
  position: absolute;
  border: none;
  background: transparent;
  cursor: pointer;
  right: 0;
  top: 0;
`
