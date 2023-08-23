import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ywlfurpwjmpgeojhsqby.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

supabase
  .channel('any')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'countries' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()