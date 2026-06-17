import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useBanking } from './banking-provider'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
  const { actions } = useBanking();

  const handleLogOut = async () => {
    actions.logout();
    router.push('/sign-in');
  }

  return (
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName[0]}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.firstName}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.email}
          </p>
      </div>

      <button type="button" className="footer_image" onClick={handleLogOut}>
        <Image src="/icons/logout.svg" fill alt="logout" />
      </button>
    </footer>
  )
}

export default Footer
