                  <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {activity.name}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{activity.description}</p>
                  {(activity.images && activity.images.length > 0) ? (
                    <div className="mt-3">
                      <ImageCarousel images={activity.images} title={activity.name} />
                    </div>
                  ) : activity.image ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-3"
                    >
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-full rounded-lg shadow-md border border-primary/20"
                      />
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          )}