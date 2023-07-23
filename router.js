<Stack.Navigator
  initialRouteName="LoginScreen"
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
  <Stack.Screen name="LoginScreen" component={LoginScreen} />
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen
    name="CreatePostsScreen"
    options={{ headerShown: true }}
    component={CreatePostsScreen}
  />
  <Stack.Screen name="PostsScreen" component={PostsScreen} />
  <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  <Stack.Screen name="MapScreen" component={MapScreen} />
  <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
</Stack.Navigator>;
