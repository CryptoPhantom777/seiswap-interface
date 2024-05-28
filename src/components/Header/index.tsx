import useScrollPosition from '@react-hook/window-scroll'
import React from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

// import Logo from '../../assets/logo'

import { useActiveWeb3React } from '../../hooks/web3'
import { useSEIBalances } from '../../state/wallet/hooks'
import { BridgeMenu } from '../Menu/BridgeMenu'
import { OnrampMenu } from '../Menu/OnrampMenu'
import { MobileMenu } from '../Menu/MobileMenu'

// import { ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
// import Modal from '../Modal'
// import UniBalanceContent from './UniBalanceContent'
import { ChainId } from 'constants/chains'
import DiffusionLogo from '../../assets/svg/logo.svg'
import { ExternalLink } from 'theme/components'

const Logo = styled.img`
  height: 40px;
`

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;

  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `${theme.bg0}`}
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 120px 1fr;

  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
    backdrop-filter: blur(4px) brightness(50%) saturate(150%);
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  background: ${({ theme }) => `${theme.darkTransparent2}`};
  margin-left: 4%;
  width: fit-content;
  padding: 4px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => `${theme.darkTransparent2}`};
  border-radius: 8px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const HideLarge = styled.span`
  @media screen and (min-width: 700px) {
    display: none !important;
  }
`

const NetworkCard = styled(YellowCard)`
  border-radius: 8px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
    activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 8px 12px;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: 800;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: 800;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const NETWORK_LABELS: Record<ChainId, string> = {
    [ChainId.TESTNET]: 'Eth Testnet',
    [ChainId.MAINNET]: 'Eth',
    [ChainId.RINKEBY]: 'Rinkeby',
}

export default function Header() {
    const { account, chainId } = useActiveWeb3React()
    const { t } = useTranslation()
    // const [isBridgeOpen, setIsBridgeOpen] = useState(false)

    const userEthBalance = useSEIBalances(account ? [account] : [])?.[account ?? '']
    // const [isDark] = useDarkModeManager()

    // const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)

    const scrollY = useScrollPosition()

    return (
        <HeaderFrame showBackground={scrollY > 45}>
            {/* <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal> */}
            <HeaderRow>
                <Title href=".">
                    <Logo src={DiffusionLogo} />
                </Title>
            </HeaderRow>
            <HideSmall>
                <HeaderLinks>
                    <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
                        {t('swap')}
                    </StyledNavLink>
                    <StyledNavLink
                        id={`pool-nav-link`}
                        to={'/pool'}
                        isActive={(match, { pathname }) =>
                            Boolean(match) ||
                            pathname.startsWith('/add') ||
                            pathname.startsWith('/remove') ||
                            pathname.startsWith('/increase') ||
                            pathname.startsWith('/find')
                        }
                    >
                        {t('pool')}
                    </StyledNavLink>
                    <StyledExternalLink id={`charts-nav-link`} href="https://docs.seiswap.xyz">
                        {'Docs'}
                        <sup>↗</sup>
                    </StyledExternalLink>
                    <StyledExternalLink id={`charts-nav-link`} href="https://t.me/Sei_Swap">
                        {'Telegram'}
                        <sup>↗</sup>
                    </StyledExternalLink>
                    {/*<StyledExternalLink id={`charts-nav-link`} href="https://x.com/SeiSwap_">
                        {'X'}
                        <sup>↗</sup>
                    </StyledExternalLink>*/}
                    {/*<BridgeMenu />*/}
                    {/* <StyledExternalLink id={`charts-nav-link`} href="https://info.diffusion.fi">
                        {t('Charts')}
                        <sup>↗</sup>
                    </StyledExternalLink> */}
                </HeaderLinks>
            </HideSmall>
            <HeaderControls>
                <HeaderElement>
                    <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                        {account && userEthBalance ? (
                            <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                                {userEthBalance?.toSignificant(4)} <span style={{ color: '#27D2EA' }}>SEI</span>
                            </BalanceText>
                        ) : null}
                        <Web3Status />
                    </AccountElement>
                </HeaderElement>
                <HeaderElementWrap>
                    <HideLarge>
                        <MobileMenu />
                    </HideLarge>
                </HeaderElementWrap>
            </HeaderControls>
        </HeaderFrame>
    )
}
