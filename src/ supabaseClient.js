// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xzgrexpbgrpkxyxucwno.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Z3JleHBiZ3Jwa3h5eHVjd25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTA2MzEsImV4cCI6MjA2MzAyNjYzMX0.U_NkebTZjqBHpjpP5MIOQiB8dEkR88Qd5twMZ3m-FLA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
