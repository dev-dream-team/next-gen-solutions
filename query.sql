    SELECT 
        user.username as username, 
        user_profile.age as age,
        user_profile.bio as bio,
        user_profile.gender as gender,
        interest.interest_name as interest
    FROM user 
    JOIN user_profile ON user_profile.user_id = user.id
    JOIN user_interest ON user_interest.user_profile_id = user_profile.id
    JOIN interest ON interest.id = user_interest.interest_id
    WHERE interest.interest_name = 'hiking'
    AND user_profile.age = 24
    AND user_profile.gender = 'female'