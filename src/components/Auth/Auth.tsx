import { Auth } from '@supabase/auth-ui-react';

import { supabase } from '../../services/supabase.service';
import MainColumn from '../MainColumn/MainColumn';

const SupabaseAuth = () => (
  <MainColumn title={'Auth'}>
    <Auth supabaseClient={supabase} redirectTo="/" providers={['discord']} theme="dark" />
  </MainColumn>
);

export default SupabaseAuth;
