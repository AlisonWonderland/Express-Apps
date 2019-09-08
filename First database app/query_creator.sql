SELECT 
    CASE
        WHEN email LIKE '%yahoo%' THEN 'Yahoo'
        WHEN email LIKE '%gmail%' THEN 'gmail'
        WHEN email LIKE '%hotmail%' THEN 'hotmail'
        ELSE 'Other'
    END AS provider,
    COUNT(*) as total_users
FROM users
GROUP BY provider;
