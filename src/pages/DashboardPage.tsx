import React, { useState } from 'react';
import { Tabs, TabPanel } from 'components';
import { CurrencyRates, Convertor, History } from 'features';

const CURRENCY_TAB = 'CURRENCY_TAB';
const CONVERTOR_TAB = 'CONVERTOR_TAB';
const HISTORY_TAB = 'HISTORY_TAB';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState(CURRENCY_TAB);

  const handleChangeTab = (tab: string) => setActiveTab(tab);

  return (
    <Tabs active={activeTab} onChange={handleChangeTab}>
      <TabPanel value={CURRENCY_TAB} title="Курсы валют">
        <CurrencyRates />
      </TabPanel>
      <TabPanel value={CONVERTOR_TAB} title="Конвертор">
        <Convertor />
      </TabPanel>
      <TabPanel value={HISTORY_TAB} title="История">
        <History />
      </TabPanel>
    </Tabs>
  );
}

export default DashboardPage;
