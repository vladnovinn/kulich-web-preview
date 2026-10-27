import {
  CompanyMenuCell,
  CompanyProfileCell,
  CompanySheet,
  lkCompanySheet,
  type CompanyAccount,
  type CompanyCellState,
  type CompanyRow,
  type CompanySheetState,
} from '../kit/CompanySheet'

const profile: CompanyRow = { title: 'Мой профиль', icon: 'user' }
const companyProfile: CompanyRow = { title: 'Профиль компании', icon: 'pass' }
const addCompany: CompanyRow = { title: 'Добавить компанию', icon: 'plus', tile: true }
const fly: CompanyRow = { title: 'AO Слетать ру', icon: 'briefcase', tile: true }
const holding: CompanyRow = {
  title: 'Холдинг ООО «Старворс»',
  subtitle: '24 компании',
  icon: 'briefcase',
  tile: true,
}
const warm: CompanyRow = { title: 'ООО «Пошла тепленькая»', icon: 'briefcase', tile: true }
const nishyak: CompanyRow = { title: 'ООО «Ништяк»', icon: 'briefcase', tile: true }
const allCompanies: CompanyRow = { title: 'Все компании', icon: 'home', tile: true }

const personal = { title: 'Иван Лыткин', icon: 'user' as const }
const flyAccount = { title: 'AO Слетать ру', subtitle: 'Иван Лыткин', icon: 'briefcase' as const }

const states: { label: string; state: CompanySheetState }[] = [
  {
    label: 'КБРКО без имени',
    state: {
      id: 'kbrko-phone',
      account: { title: '+7968*****02', icon: 'user' },
      credits: [profile, addCompany],
    },
  },
  {
    label: 'КБРКО с именем',
    state: {
      id: 'kbrko-name',
      account: personal,
      credits: [profile, addCompany],
    },
  },
  {
    label: 'ЛКГК',
    state: {
      id: 'lkgk',
      account: personal,
      business: { rows: [fly, holding, warm] },
    },
  },
  {
    label: 'ЛК',
    state: lkCompanySheet,
  },
  {
    label: 'ЛКХ',
    state: {
      id: 'lkh',
      account: { title: 'Холдинг ООО «Старворс»', subtitle: 'Иван Лыткин', icon: 'briefcase' },
      business: {
        rows: [fly, { ...holding, selected: true }, warm, addCompany],
        more: 'Посмотреть все',
      },
    },
  },
  {
    label: 'ЛК головная компания',
    state: {
      id: 'lk-head',
      account: { title: 'ООО «Ништяк»', subtitle: 'Иван Лыткин', icon: 'briefcase' },
      credits: [companyProfile, profile],
      business: {
        rows: [fly, holding, { ...nishyak, badge: 'crown', selected: true }, warm, addCompany],
        more: 'Посмотреть все',
      },
    },
  },
  {
    label: 'ЛК дочерняя компания',
    state: {
      id: 'lk-child',
      account: { title: 'ООО «Ништяк»', subtitle: 'Иван Лыткин', icon: 'briefcase' },
      credits: [companyProfile, profile],
      business: {
        rows: [fly, holding, { ...nishyak, badge: 'forward', selected: true }, warm, addCompany],
        more: 'Посмотреть все',
      },
    },
  },
  {
    label: 'ЛК кнопка все компании',
    state: {
      id: 'lk-all',
      account: flyAccount,
      credits: [companyProfile, profile],
      business: {
        rows: [allCompanies, { ...fly, selected: true }, fly, warm, addCompany],
        more: 'Показать все',
      },
    },
  },
  {
    label: 'ЛК старый профиль без доступа к ЛКГК',
    state: {
      id: 'lk-old',
      account: flyAccount,
      credits: [companyProfile, profile],
      business: {
        rows: [{ ...fly, selected: true }, fly, warm],
        more: 'Показать все',
      },
    },
  },
  {
    label: 'ЛК новый профиль только с доступо к ЛКГК',
    state: {
      id: 'lk-new',
      account: flyAccount,
      credits: [companyProfile, profile],
      business: {
        rows: [{ ...fly, selected: true }, fly, warm, warm, warm],
        more: 'Показать все',
      },
    },
  },
]

const profileAccount: CompanyAccount = {
  title: 'ООО «ТЦР»',
  subtitle: 'Description',
  icon: 'briefcase',
}

const profileFade: CompanyAccount = {
  title: 'ООО «Название компании которое не помещается»',
  subtitle: 'Description',
  icon: 'briefcase',
}

const companySample: CompanyRow = {
  title: 'ООО «ТЦР»',
  inn: '6641 6572 1736',
  icon: 'briefcase',
  tile: true,
  selected: true,
}

const profileCells: { label: string; account: CompanyAccount; interaction?: CompanyCellState }[] = [
  { label: 'Normal', account: profileAccount },
  { label: 'Normal\nFaded text', account: profileFade },
  { label: 'Hover', account: profileAccount, interaction: 'hover' },
  { label: 'Pressed', account: profileAccount, interaction: 'pressed' },
]

const companyCells: { label: string; interaction?: CompanyCellState }[] = [
  { label: 'Normal' },
  { label: 'Hover', interaction: 'hover' },
  { label: 'Pressed', interaction: 'pressed' },
]

export function CompanySheetDemo() {
  return (
    <div className="company-sheet-demo">
      <div className="company-sheet-states">
        <section className="company-sheet-states-group is-profile">
          <h2 className="company-sheet-states-title">Состояния ячейки профиля</h2>
          {profileCells.map((item) => (
            <div key={item.label} className="company-sheet-states-row">
              <p className="company-sheet-states-label">{item.label}</p>
              <div className="company-sheet-states-slot">
                <CompanyProfileCell account={item.account} interaction={item.interaction} />
              </div>
            </div>
          ))}
        </section>
        <section className="company-sheet-states-group">
          <h2 className="company-sheet-states-title">Состояния ячейки компании</h2>
          {companyCells.map((item) => (
            <div key={item.label} className={`company-sheet-states-row${item.interaction === 'hover' ? ' is-roomy' : ''}`}>
              <p className="company-sheet-states-label">{item.label}</p>
              <div className="company-sheet-states-slot">
                <CompanyMenuCell row={companySample} interaction={item.interaction} />
              </div>
            </div>
          ))}
        </section>
        <section className="company-sheet-states-group">
          <h2 className="company-sheet-states-title">Состояния ячейки добавления компании</h2>
          {companyCells.map((item) => (
            <div key={item.label} className="company-sheet-states-row">
              <p className="company-sheet-states-label">{item.label}</p>
              <div className="company-sheet-states-slot">
                <CompanyMenuCell row={addCompany} interaction={item.interaction} />
              </div>
            </div>
          ))}
        </section>
      </div>
      {states.map(({ label, state }) => (
        <section key={state.id} className="company-sheet-case">
          <p className="demo-caption">{label}</p>
          <CompanySheet state={state} />
        </section>
      ))}
    </div>
  )
}
