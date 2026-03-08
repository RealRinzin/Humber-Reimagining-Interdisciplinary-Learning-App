<?php

namespace App\Enums;

// Enums prevent typos like 'Stduent' vs 'Student'
// Instead of hardcoding strings everywhere, we use this
enum RoleEnum: string
{
    case STUDENT = 'student';
    case STAFF = 'staff';
}