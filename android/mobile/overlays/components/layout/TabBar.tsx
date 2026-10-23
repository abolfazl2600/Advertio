import { NavLink, useNavigate } from 'react-router-dom'
import { Icon, type IconName } from '@/shared/components/ui/Icon'
import { ROUTES } from '@/shared/constants/routes'
import { postEntryPath } from '@/shared/config/journeys.config'
import { haptic } from '@/shared/platform/haptics'
import { entryCopy } from '@/shared/onboarding/copy'

export function TabBar() {
  const copy = entryCopy()
  const navigate = useNavigate()
  const postPath = postEntryPath()
  const link = (to: string, label: string, icon: IconName, end = false) => <NavLink key={to} to={to} end={end} onClick={() => haptic('light')} className={({ isActive }) => isActive ? 'tab active' : 'tab'}><Icon name={icon} size={21}/><span>{label}</span></NavLink>
  return <nav className="tabbar" lang={copy.lang} dir={copy.dir} aria-label={copy.navigation} style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
    {link(ROUTES.HOME, copy.home, 'home', true)}{link(ROUTES.SEARCH, copy.search, 'search')}
    <button type="button" className="tab post-tab" disabled={!postPath} onClick={() => { if (postPath) { haptic('light'); navigate(postPath) } }}><div className="post-fab"><Icon name="plus" size={20}/></div><span>{copy.post}</span></button>
    {link(ROUTES.MY_PROFILE, copy.profile, 'user')}
  </nav>
}
